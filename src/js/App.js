import React, {Component} from 'react';
import axios from 'axios';
import {StyledInput, StyledList, StyledBtn, StyledUl} from "./style"
import Title from "./views/sharedViews/title"

class App extends Component {
    // initialize our state
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            id: 0,
            message: null,
            intervalIsSet: false,
            idToDelete: null,
            idToUpdate: null,
            objectToUpdate: null,
        };
    }


    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has
    // changed and implement those changes into our UI
    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 1000);
            this.setState({intervalIsSet: interval});
        }
    }

    // never let a process live forever
    // always kill a process everytime we are done using it
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            window.clearInterval(this.state.intervalIsSet);
            this.setState({intervalIsSet: null});
        }
    }

    // just a note, here, in the front end, we use the id key of our data object
    // in order to identify which we want to Update or delete.
    // for our back end, we use the object id assigned by MongoDB to modify
    // data base entries

    // our first get method that uses our backend api to
    // fetch data from our data base
    getDataFromDb = () => {
        window.fetch('http://localhost:8080/api/getData')
            .then((data) => data.json())
            .then((res) => this.setState({data: res.data}));
    };

    // our put method that uses our backend api
    // to create new query into our data base
    putDataToDB = (message) => {
        let currentIds = this.state.data.map((data) => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }

        axios.post('http://localhost:8080/api/putData', {
            id: idToBeAdded,
            message: message,
        });
    };

    // our delete method that uses our backend api
    // to remove existing database information
    deleteFromDB = (idTodelete) => {
        parseInt(idTodelete);
        let objIdToDelete = null;
        this.state.data.forEach((dat) => {
            if (dat.id == idTodelete) {
                objIdToDelete = dat._id;
            }
        });

        axios.delete('http://localhost:8080/api/deleteData', {
            data: {
                id: objIdToDelete,
            },
        });
    };

    // our update method that uses our backend api
    // to overwrite existing data base information
    updateDB = (idToUpdate, updateToApply) => {
        let objIdToUpdate = null;
        parseInt(idToUpdate);
        this.state.data.forEach((dat) => {
            if (dat.id == idToUpdate) {
                objIdToUpdate = dat._id;
            }
        });

        axios.post('http://localhost:8080/api/updateData', {
            id: objIdToUpdate,
            update: {message: updateToApply},
        });
    };

    // here is our UI
    // it is easy to understand their functions when you
    // see them render into our screen
    render() {
        const {data} = this.state;
        return (
            <div>
                <Title> To Dos</Title>
                <div>
                    <StyledInput
                        type="text"
                        onChange={(e) => this.setState({message: e.target.value})}
                        placeholder="What needs to be done?"
                    />
                    <StyledBtn onClick={() => this.putDataToDB(this.state.message)}>
                        ADD
                    </StyledBtn>
                </div>
                <br/>
                <br/>
                <br/>

                <StyledUl>
                    {data.length <= 0
                        ? 'NO DB ENTRIES YET'
                        : data.map((dat) => {
                            return (
                                <React.Fragment key={dat._id}>
                                    <StyledList key={dat.message}
                                    >
                                        {dat.message}
                                    </StyledList>
                                    <StyledBtn onClick={() => this.deleteFromDB(dat.id)}>
                                        Delete
                                    </StyledBtn>
                                    <StyledInput
                                        type="text"
                                        onChange={(e) => this.setState({updateToApply: e.target.value})}
                                        placeholder="What needs to be updated value!"
                                    />
                                    <StyledBtn onClick={() => this.updateDB(dat.id, this.state.updateToApply)}>
                                        Update
                                    </StyledBtn>
                                    <br/>
                                    <br/>
                                    <br/>
                                </React.Fragment>
                            )
                        })}
                </StyledUl>
            </div>
        );
    }
}

export default App;
