import "reflect-metadata"

import { ApolloServer } from "apollo-server-express";
import express from 'express';
import * as dotenv from 'dotenv';
import http from 'http';
import { buildSchema, registerEnumType } from "type-graphql";
import { authChecker } from "./middlewares/auth.middleware";
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws'; // yarn add ws
import { verify } from "jsonwebtoken"
import { Context } from "./common/interfaces/context.interface";
import { AppointmentStatus } from "./common/enums/appointment.enum";
import { userRoleStatus } from "./common/enums/userRoles.enum";
import pubsub from "./pubSub";

const registerEnumTypes = (enumTypes: any) => {
    enumTypes.forEach((enumType: any) => {
        registerEnumType(enumType[0], {
            name: enumType[1],
            description: enumTypes[2]
        })
    });
}

const wsServer = new WebSocketServer({
  port: 5050,
  path: '/subscriptions',
});

// apollo function server
async function startApolloServer() {
    dotenv.config()

    registerEnumTypes([
        [AppointmentStatus, "AppointmentStatus", "The Status of a appointment"],
        [userRoleStatus, "usersStatus", "The users roles status - user, admin, patient, doctor"]
    ])

    const schema = await buildSchema({
        resolvers: [
            __dirname + "/modules/**/*.ts"
        ],
        authChecker,
        pubSub: pubsub
        
    })


//    start the server
    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        // cache: "bounded",
        context: ({ req, res }) => {
            const auth = req.headers.authorization;
            let user = undefined;
            if (auth) {
                const token = auth.split(" ")[1]

                const secretKey = process.env.SECRET_KEY

                try {

                    user = verify(token, secretKey || '');
                } catch (error) { }
            }

            const ctx: Context = {
                req, res, user
            }            

            return ctx
        }
    });
     useServer({ schema }, wsServer);

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
