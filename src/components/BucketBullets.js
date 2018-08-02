import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import './BucketBullets.css';

const BUCKET_BULLETS = gql`
{
  bucketBullets {
    id
    description
    completed
  }
}
`;

const TOGGLE_BULLET = gql`
  mutation ToggleBullet($id: Int!) {
    toggleBullet(id: $id) {
      id
      description
      completed
    }
  }
`;

const ADD_BULLET = gql`
  mutation AddBullet($description: String!) {
    addBullet(description: $description) {
      id
      description
      completed
    }
  }
`;

class BucketBullets extends Component {
    constructor(props){
        super(props);
        this.state = {description: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({description: event.target.value});
    }

    render() {
        return (
            <Mutation mutation={ADD_BULLET}>
            {addBullet => (
                <form className='BulletsForm' onSubmit={(event) => {
                    if(this.state.description.length > 0) {
                        addBullet({ variables: { description: this.state.description } })
                    }
                }}>
                    <Query query={BUCKET_BULLETS}>
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;
                
                        return data.bucketBullets.map(({ id, description, completed }) => {
                            return (
                                <Mutation mutation={TOGGLE_BULLET} key={id}>
                                {toggleBullet => (
                                    <div className='Bullet' key={id}>
                                        <input type='checkbox' checked={completed} onChange={() => toggleBullet({ variables: { id } })} />
                                        <span>{`${description}`}</span>
                                    </div>
                                )}
                                </Mutation>
                            );
                        });
                    }}
                    </Query>
                    <input type='text' value={this.state.description} onChange={this.handleChange} />
                    <input type='submit'/>
                </form>
            )}
            </Mutation>
        );
    }
}

export default BucketBullets;