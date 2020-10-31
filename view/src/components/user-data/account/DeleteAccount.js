import React, { Fragment } from "react";
import Button from "../../buttons/Button";
import EditAccountData from "./EditAccountData";

import PropTypes from "prop-types";

const DeleteAccount = ({
    onClick,
    onChange,
    cancelEdit,
    onDelete,
    deleteField,
    displayDeleteWindow,
    deleteCode,
    deleteCodeIncorrect,
}) => {
    return (
        <Fragment>
            {displayDeleteWindow && (
                <EditAccountData
                    heading='Delete your account?'
                    field={deleteField}
                    name='confirmDeleteCode'
                    cancelEdit={cancelEdit}
                    onChange={onChange}
                    onSubmit={onDelete}
                    value='Delete'
                    deleteAccount='true'
                    deleteCode={deleteCode}
                    deleteCodeIncorrect={deleteCodeIncorrect}
                />
            )}
            <h3 className='delete-heading'>Delete your account?</h3>
            <p>
                <b>Warning</b>
            </p>
            <p className='delete-disclaimer'>
                You cannot undo this action and all documents associated with
                your account will be permanently deleted. Please only delete
                your account after ensuring any work you have saved on the
                system is safely backed up. Be aware that all master copies of
                projects you created will be sent to all of the collaborators on
                those projects when you delete your account
            </p>
            <Button
                id='delete-account-btn'
                classes='small-btn'
                onClick={(e) => onClick(e)}
                value='Delete'
            />
        </Fragment>
    );
};

DeleteAccount.propTypes = {
    user: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    displayDeleteWindow: PropTypes.bool.isRequired,
    deleteField: PropTypes.object,
    deleteCode: PropTypes.number,
    deleteCodeIncorrect: PropTypes.bool.isRequired,
};

export default DeleteAccount;
