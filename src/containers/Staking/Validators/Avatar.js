import * as PropTypes from 'prop-types';
import Axios from 'axios';
import Profile from '../../../assets/images/profile.svg';
import React, {useEffect, useState} from 'react';
import globals from '../../../constants/globals';

const Avatar = ({identity}) => {
    const [avatarURL, setAvatarURL] = useState('');

    useEffect(() => {
        if (identity === '') {
            setAvatarURL('');
            return;
        }

        if (globals.validators.avatars[identity]) {
            setAvatarURL(globals.validators.avatars[identity]);
            return;
        }

        const url = 'https://keybase.io/_/api/1.0/user/lookup.json' +
            `?key_suffix=${identity}&fields=pictures`;

        const getAvatar = async () =>{
            await Axios.get(url)
                .then((res) => {
                    const url = res?.data?.them[0]?.pictures?.primary?.url;
                    if (url) {
                        globals.validators.avatars[identity] = url;
                        setAvatarURL(url);
                    }
                })
                .catch(console.error);
        };
        getAvatar();
    }, [identity]);

    return (
        <img
            alt="moniker-image"
            className="moniker-image"
            src={avatarURL || Profile}
        />
    );
};

Avatar.propTypes = {
    identity: PropTypes.string.isRequired,
};

export default Avatar;
