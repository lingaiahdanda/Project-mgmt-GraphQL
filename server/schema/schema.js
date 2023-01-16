const projects  = require('../models/Project')
const clients = require('../models/Client')

const {GraphQLObjectType,GraphQLSchema,GraphQLID,GraphQLString,GraphQLList} = require('graphql')

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: ()=> ({
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        email:{type: GraphQLString},
        phone:{type: GraphQLString},
    })
});

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields:()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description:{type: GraphQLString},
        status: {type: GraphQLString},
        client:{
            type: ClientType, 
            resolve(parent,args){
                return clients.findById(parent.clientId)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parent,args){
                return clients
            }
        },
        client:{
            type:  ClientType,
            args:{
                id: {type: GraphQLID}
            },
            resolve(parent,args){
                return clients.findById(args.id)
            }
        },
        projects:{
            type: new GraphQLList(ProjectType),
            resolve(parent,args){
                return projects.find()
            }
        },
        project:{
            type: ProjectType,
            args:{
                id:{type: GraphQLID}
            },
            resolve(parent,args){
                return projects.findById(args.id)
            }
        },
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})