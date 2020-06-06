import React, { useEffect } from 'react';
import PersonItem from '../person-item/PersonItem';
import { fetchPeopleAction } from '../../../redux/actions/user.actions';
import { connect } from 'react-redux';
import Loading from '../../../shared/loading/loading';
import './people-listings-style.css';

const PeopleListings = ({ people, fetchPeopleAction }) => {
  useEffect(() => {
    fetchPeopleAction();
  }, []);

  return (
    <section className='people-collection'>
      <div className=' scroll'>
        {people ? (
          people.map(person => {
            return <PersonItem key={person.id} person={person} />;
          })
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    people: state.app.people,
  };
};

export default connect(mapStateToProps, { fetchPeopleAction })(PeopleListings);
