import React from "react";

const EditableAvatar = ({width, height, currentUser,  savedAvatarProps = {}}) => {     
    const { shape = "circle", color = "#b385de", text = currentUser || "User" } = savedAvatarProps;
    const displayText = text ? text[0].toUpperCase() : "U";
    
    return (
        <div>
            <div
                style={{
                width: width,
                height: height,
                backgroundColor: color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: shape === "circle" ? "50%" : "10%",
                cursor: "pointer",
                }}            >
                <span style={{ color: "white", fontSize: width === 30 ? "20px" : "30px" }}>{width === 30 ? displayText : text}</span>
            </div>
        </div>
    );
};

export default EditableAvatar;
