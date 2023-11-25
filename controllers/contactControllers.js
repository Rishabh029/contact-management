const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")

// Desc - Get all contacts
// route Get /api/contacts
// Access will be private
const getContacts = asyncHandler (async (req, res) => {
    const contacts =  await Contact.find({user_id : req.user.id});
    res.status(200).json(contacts);
});


// Desc - Create the contacts
// route Post /api/contacts
// Access will be private

const createContact = asyncHandler (async (req, res)  => {
    //console.log("The Request body : ",req.body)
    const {name , email , phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All feilds are Mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id : req.user.id,
    })
    res.status(201).json(contact);
});


// Desc - Delete all contacts
// route Delete /api/contacts/:id
// Access will be private

const deleteContact = asyncHandler (async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Not Found");
    }
    if (contact.user_id.toString() !== req.user.id ) {
        res.status(403);
        throw new Error("User don't have permission to delete this");
    }
    await Contact.deleteOne({_id: req.params.id });
    res.status(200).json(contact);
});

 
// Desc - Update all contacts
// route PUT /api/contacts/:id
// Access will be private

const updateContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Not Found");
    }
    if (contact.user_id.toString() !== req.user.id ) {
        res.status(403);
        throw new Error("User don't have permission to edit this");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
     
    res.status(200).json(updatedContact);
});

// Desc - Get the contact
// route Get /api/contacts/:id
// Access will be private

const getContact = asyncHandler (async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Not Found");
    }
    res.status(200).json(contact);
});

module.exports = { deleteContact, createContact, getContacts, getContact, updateContact };



