const graphql = require('graphql');
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;
/*
//hard code data
const users=[
    {id:'23',firstName:'Bills',age:10},
    {id:'47', firstName:'Yellow' ,age:20}
];
*/
//Created a UserType of GraphQL
const UserType= new GraphQLObjectType({
    name: 'User',
    fields:{
        id:{type: GraphQLString},
        firstName:{type: GraphQLString},
        age:{type: GraphQLInt},
    },

});

//points to very first data
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user:{
            type: UserType,
            args:{ id:{type: GraphQLString}},
            resolve(parentValue, args){ 
                //go to database and find data you are looking for
             //_.find(users,{id: args.id});
             //using axios to fetch json data from external api
            return axios.get(`http://localhost:3000/users/${args.id}`).then(response=> response.data)
            //users.find((element) => element.id == args.id);
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})