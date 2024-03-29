import { Request, Response } from "express"
import { getRepository } from "typeorm";
import { Reset } from "../entity/reset.entity";
import { createTransport } from "nodemailer";
import { User } from "../entity/user.entity";
import bcryptjs from "bcryptjs"

export const ForgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    const token = Math.random().toString(20).substring(2, 12);

    await getRepository(Reset).save({
        email,
        token
    });

    const transporter = createTransport({
        host: "0.0.0.0",
        port: 1025
    });

    const url = `http://localhost:5173/#/reset/${token}`;

    await transporter.sendMail({
        from: "from@raisguard.com",
        to: email,
        subject: "Reset your password",
        html: `Click <a href="${url}">here</a> to here your password!`
    });

    res.send({
        message: "Please check your email"
    });
}

export const ResetPassword = async (req: Request, res: Response) => {
    const { token } = req.body;
    const body = req.body;

    if (body["password"] !== body["password-confirm"]) {
        return res.status(400).send({
            message: "Password's do not matches!"
        });
    }

    const resetPassword = await getRepository(Reset).findOne({
        where: {
            token: token
        }
    });

    if (!resetPassword) {
        return res.status(400).send({
            message: "Invalid link"
        });
    }

    const user = await getRepository(User).findOne({
        where: {
            email: resetPassword.email
        }
    });

    if (!user) {
        return res.status(404).send({
            message: "Invalid link!"
        });
    }

    await getRepository(User).update(user.id, {
        password: await bcryptjs.hash(body["password"], 12)
    });

    await getRepository(Reset).delete({
        token: token
    });

    res.send({
        message: "success"
    });
}
