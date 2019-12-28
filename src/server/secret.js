const secrets = {
  dbUri: "mongodb+srv://shobhitsingh29:yatra@clusterbackend-nypki.mongodb.net/shobhitdb"
};

const getSecret = key => secrets[key];

export default getSecret;
