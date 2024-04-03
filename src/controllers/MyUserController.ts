import { Request, Response } from "express";
import User from "../models/user";

const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const currentUser = await User.findOne({ _id: req.userId });
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(currentUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong" });
    }
}

const createCurrentUser = async (req: Request, res: Response) => {
    try {
        const { auth0Id } = req.body;
        const exitstringUser = await User.findOne({ auth0Id })

        if (exitstringUser) {
            return res.status(200).send();
        }

        const newuser = new User(req.body);
        await newuser.save();

        res.status(201).json(newuser.toObject());
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating user" });
    }
};

const updateCurrentUser = async (req: Request, res: Response) => {
    try {
        const { name, addresLine1, country, city } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name;
        user.addressLine1 = addresLine1;
        user.city = city;
        user.country = country;

        await user.save();

        res.send(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating user" });
    }
};

export default {
    getCurrentUser,
    createCurrentUser,
    updateCurrentUser,
};