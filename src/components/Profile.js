import React, {useState} from 'react';
import Flex from "../elements/Flex";
import Paper from "../elements/Paper";
import styled from "styled-components"
import {FaUser, FaUserCheck, FaUserPlus} from "react-icons/fa"
import PropTypes from "prop-types";
import Typography from "../elements/Typography";
import {createContact} from "../store/actions/contactActions";
import {connect} from "react-redux";
import Loader from "../assets/loader/Loader";

const AvatarContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: #556080;
  border: 2px solid #3D4554;

  & > svg {
    color: white;
  }
`

const UserInfo = styled.div`

`

const IconContainer = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    height: 20px;
    width: 20px;
    color: #3CBF27;
  }
`

const IconButton = styled.button`
  all: unset;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & > svg {
    height: 20px;
    width: 20px;
    color: white;
  }
`

const Profile = ({userId, profileData, createContact}) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Paper width="500px" padding="10px" margin="5px">
            <Flex direction="row">
                <Flex direction="row" justifyContent="flex-start">
                    <AvatarContainer>
                        <FaUser/>
                    </AvatarContainer>
                    <UserInfo>
                        <Typography
                            margin="0px 0px 0px 10px">{profileData.firstName} {profileData.lastName}</Typography>
                        <Typography margin="0px 0px 0px 10px">{profileData.email}</Typography>
                    </UserInfo>
                </Flex>
                {
                    profileData.isUserContact
                        ? <IconContainer>
                            <FaUserCheck/>
                        </IconContainer>
                        : isLoading
                            ? <Loader/>
                            : <IconButton onClick={() => createContact(userId, profileData.user, setIsLoading)}>
                                <FaUserPlus/>
                            </IconButton>
                }
            </Flex>
        </Paper>
    );
};

Profile.propTypes = {
    userId: PropTypes.string,
    profileData: PropTypes.object,
    createContact: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.currentUser.id,
    }
}

export default connect(mapStateToProps, {createContact})(Profile);