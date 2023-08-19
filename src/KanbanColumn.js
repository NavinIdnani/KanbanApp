import React from "react";
import Card from "./Card";

function KanbanColumn({ title, displayOption, status, tickets }) {
   const getTitleForPriority = (status) => {
      switch (status) {
         case "Todo":
            return "Unknown Priority";
         case "In Progress":
            return "High";
         case "Backlog":
            return "Low";
         case "Completed":
            return "Medium";
         default:
            return "No Priority";
      }
   };

   return (
      <div className="col">
         <h3 className="column-title">
            {displayOption === "priority" ? getTitleForPriority(status) : title}
         </h3>
         <div className="card-container">
            {tickets.map((ticket) => (
               <Card key={ticket.id} ticket={ticket} />
            ))}
         </div>
      </div>
   );
}

export default KanbanColumn;
