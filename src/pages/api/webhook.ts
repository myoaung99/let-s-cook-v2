import type { IncomingHttpHeaders } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { WebhookRequiredHeaders } from 'svix';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { Webhook } from 'svix';
import User from "@/Model/User";
import connectDB from "@/lib/db-config";

const webhookSecret: string = process.env.WEBHOOK_SECRET!;

export default async function handler(
    req: NextApiRequestWithSvixRequiredHeaders,
    res: NextApiResponse
) {
    const payload = JSON.stringify(req.body);
    const headers = req.headers;
    // Create a new Webhook instance with your webhook secret
    const wh = new Webhook(webhookSecret);

    let evt: WebhookEvent;
    try {
        // Verify the webhook payload and headers
        evt = wh.verify(payload, headers) as WebhookEvent;
    } catch (_) {
        // If the verification fails, return a 400 error
        return res.status(400).json({});
    }
    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === 'user.created') {
        connectDB();
        // const newUser = new User({clerk_id: id})
        // const user = await newUser.save()
        // console.log('user', user)
        // res.status(201).json({user});
        console.log(`User ${id} was ${eventType}`);
    }
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
    headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};