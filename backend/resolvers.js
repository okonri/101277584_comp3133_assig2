const User = require('./models/User')
const Listing = require('./models/Listing')
const Booking = require('./models/Booking')

exports.resolvers = {
    Query: {
        login: async (parent, args) => {
            let user = await User.findOne({$and: [{username: args.username}, {password: args.password}]})
            if (!user) {
                throw new Error("User and Password Didn't match")
            }
            if (user.type == 'admin') {
                return { secret: process.env.SECRET_ADMIN }
            } else {
                return { secret: process.env.SECRET_USER }
            }
        },
        
        getAllUserBooking: async (parent, args) => {
            let bookings = []
            if (args.username) {
                if (args.secret == process.env.SECRET_USER) {
                    bookings = await Booking.find({username: args.username})
                }
                if (args.secret == process.env.SECRET_ADMIN) {
                    bookings = await Booking.find({username: args.username})
                } else {
                    throw new Error("Login required to view bookings")
                }
                
            }
            return bookings
        },

        getListings: async (parent, args) => {
            return await Listing.find({});
        },

        getAllAdminListings: async (parent, args) => {
            if (args.secret == process.env.SECRET_ADMIN) {
                return await Listing.find({})
            } else {
                throw new Error("Admin login required to for this section ")
            }
        },

        searchListingByName: async (parent, args) => {
            return await Listing.find({listing_title : args.listing_title})
        },

        searchListingByCity: async (parent, args) => {
            return await Listing.find({"city" : args.city})
        },

        searchListingByPostalCode: async (parent, args) => {
            return await Listing.find({"postal_code" : args.postal_code})
        },

    },

    Mutation: {
        addUser: async (parent, args) => {
            let user = new User({
                username: args.username,
                firstname: args.firstname,
                lastname: args.lastname,
                password: args.password,
                email: args.email,
                type: args.type
            })
            return user.save()
        },

        addListing: async (parent, args) => {
            if (args.secret == process.env.SECRET_ADMIN) {
                let listing = new Listing({
                    listing_id: args.listing_id,
                    listing_title: args.listing_title,
                    description: args.description,
                    street: args.street,
                    city: args.city,
                    postal_code: args.postal_code,
                    price: args.price,
                    email: args.email,
                    username: args.username,
                    secret: args.secret
                })
                return listing.save()
            }
            throw new Error("Authentication Failed, please make sure you include your secret in your request.")
        },
        
        addBooking: async (parent, args) => {
            let booking = new Booking({
                listing_id: args.listing_id,
                listing_title: args.listing_title,
                booking_id: args.booking_id,
                booking_start: args.booking_start,
                booking_end: args.booking_end,
                username: args.username,
                secret: args.secret
            })
            return booking.save()
        }
    }



}