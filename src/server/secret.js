const secrets = {
  dbUri: "mongodb+srv://shobhitsingh29:yatra@cluster0-aq80y.mongodb.net/shobhitdb"
};

const getSecret = key => secrets[key];

export default getSecret;
