import "reflect-metadata"

import { ApolloServer } from "apollo-server-express";
import express from 'express';
import * as dotenv from 'dotenv';
import http from 'http';
import { buildSchema, registerEnumType } from "type-graphql";
import { UserResolver } from "./resolvers/users";
import { authChecker } from "./middlewares/auth.middleware";

import { verify } from "jsonwebtoken"
import { Context } from "./interfaces/context.interface";


const registerEnumTypes = (enumTypes: any) => {
    enumTypes.forEach((enumType: any) => {
        registerEnumType(enumType[0], {
            name: enumType[1],
            description: enumTypes[2]
        })
    });
}

async function startApolloServer() {
    dotenv.config()

    registerEnumTypes([])

    const schema = await buildSchema({
        resolvers: [
            UserResolver
        ],
        authChecker
    })



    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        cache: "bounded",
        context: ({ req, res }) => {
            const auth = req.headers.authorization;
            let user = undefined;

            if (auth) {
                const token = auth.split(" ")[1]

                try {

                    user = verify(token, process.env.SECRET_KEY || '');
                } catch (error) { }
            }

            const ctx: Context = {
                req, res, user
            }

            return ctx
        }
    });

    const app = express();
    const httpServer = http.createServer(app);
    const PORT = process.env.PORT || 4000

    await server.start();

    server.applyMiddleware({app});

    // Modified server startup
    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
}

startApolloServer();
