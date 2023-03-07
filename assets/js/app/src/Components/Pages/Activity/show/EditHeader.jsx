
export const EditHeader = () => {

    return (
        <>
            <div className="edit-header d-flex justify-content-between">
                <div className="edit-header__left">
                    <div className="edit-header__left__title">
                        <div className="edit-header__left__title__text">Edit Activity</div>
                    </div>
                    <div className="edit-header__left__description">
                        <p className="edit-header__left__description__text">Edit the activity description and add tasks</p>
                    </div>
                </div>
                <div className="edit-header__right">
                    <div className="edit-header__right__button">
                        <button className="edit-header__right__button__text">Save</button>
                    </div>
                </div>
            </div>
        </>
    );


}