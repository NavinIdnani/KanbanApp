import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

const Card = ({ ticket }) => {
   const { title, status, priority, userId, id, tag } = ticket;

   const getPriorityLabel = (priority) => {
      switch (priority) {
         case 0:
            return "No Priority";
         case 1:
            return "Low";
         case 2:
            return "Medium";
         case 3:
            return "High";
         case 4:
            return "Urgent";
         default:
            return "Unknown Priority";
      }
   };

   const getStatusBadge = (status) => {
      let badgeClass = "";

      switch (status) {
         case "Todo":
            badgeClass = "badge-danger";
            break;
         case "In Progress":
            badgeClass = "badge-warning";
            break;
         case "Backlog":
            badgeClass = "badge-primary";
            break;
         case "Completed":
            badgeClass = "badge-success";
            break;
         default:
            badgeClass = "badge-secondary";
      }

      return <span className={`badge ${badgeClass}`}>{status}</span>;
   };

   return (
      <div className="card mb-3">
         <div className="card-body">
            <h4 className="card-id">{id}</h4>
            <h5 className="card-title">{title}</h5>
            {userId}
            <br />
            <button>{tag}</button>
         </div>
      </div>
   );
};

Card.propTypes = {
   ticket: PropTypes.object.isRequired,
};

export default Card;
