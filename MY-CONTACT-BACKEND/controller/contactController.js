import ApiError from "../utils/ApiError.js";
import Contact from "../models/contactModel.js";

class ContactController {

    // GET all contacts
    async getContacts(req, res, next) {
        try {
            const contacts = await Contact.find();

            res.status(200).json({
                success: true,
                data: contacts
            });
        } catch (error) {
            next(error);
        }
    }

    // ADD contact
    async addContacts(req, res, next) {
        try {
            const { name, email, mobileNo } = req.body;

            if (!name || !email || !mobileNo) {
                throw new ApiError("Please provide valid data", 400);
            }

            const isDataExists = await Contact.findOne({
                mobileNo: mobileNo
            })

            if (isDataExists) {
                throw new ApiError("Contact already exists: ", 401)
            } else {
                const contact = await Contact.create({
                    name,
                    email,
                    mobileNo,
                    userId: req.user._id
                });

                res.status(201).json({
                success: true,
                message: "Contact created successfully",
                data: contact
                });
            }

        } catch (error) {
            next(error);
        }
    }

    // UPDATE contact
    async updateContacts(req, res, next) {
        try {
            const { id } = req.params;

            const updatedContact = await Contact.findByIdAndUpdate(
                id,
                req.body,
                { new: true, runValidators: true }
            );

            if (!updatedContact) {
                throw new ApiError("Contact not found", 404);
            }

            res.status(200).json({
                success: true,
                data: updatedContact
            });

        } catch (error) {
            next(error);
        }
    }
}

export default new ContactController();
