import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

import api from "../../../services/api";

export default NextAuth({
    providers: [
        CredentialsProvider(
            {
                name: "Credentials",
                
                credentials:{
                    email: {
                        label: "Email",
                        type: "email",
                        placeholder: "Email: exemplo@exemplo.com",
                    },
                    password: {
                        label: "Senha",
                        type: "password"
                    },
                },

                authorize: async ( credentials, req ) => {
                    try {
                        const user = await api.post(
                            "/signin", 
                            { 
                                email: credentials.email, 
                                password: credentials.password 
                            });
                        
                        if ( user ) {
                            const userAccount = user.data;

                            return userAccount;
                        }else{
                            return null;
                        }
                    }catch( error ){
                        const message = error.response.data.message;
                        throw new Error( message );
                    }
                }
            }
        )
    ],
    
    callbacks: {
        jwt: async ({ token, user }) => {
            if ( user ) {
                token.id = user.id;
            }
            return token;
        },
        session: ( { session, token }) => {
            if ( token ) {
                session.id = token.id;
          
                return session;
            }
            return session;
        },
    },
    
    secret: process.env.JWT_SECRET,
    
    pages: {
        signIn: "/",
        error: "/",
    },
    
    jwt: {
        secret: process.env.JWT_SECRET,
    },
});