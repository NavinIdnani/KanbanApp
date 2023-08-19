import React, { useEffect, useState } from "react";
import axios from "axios";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard = () => {
   const [filteredTickets, setTickets] = useState([]);
   const [displayOption, setDisplayOption] = useState("status");

   useEffect(() => {
      // Fetch data from the API
      axios
         .get("https://api.quicksell.co/v1/internal/frontend-assignment")
         .then((response) => {
            setTickets(response.data.tickets);
         })
         .catch((error) => {
            console.error("Error fetching data:", error);
         });

      const savedDisplayOption = localStorage.getItem("displayOption");
      if (savedDisplayOption) {
         setDisplayOption(savedDisplayOption);
      }
   }, []);

   useEffect(() => {
      // Update localStorage when displayOption changes
      localStorage.setItem("displayOption", displayOption);
   }, [displayOption]);

   // Grouping and sorting logic based on display and sorting options
   let groupedAndSortedTickets = {};

   // ... Implement your grouping and sorting logic here based on the displayOption
   if (displayOption === "status") {
      groupedAndSortedTickets = filteredTickets.reduce((groups, ticket) => {
         if (!groups[ticket.status]) {
            groups[ticket.status] = [];
         }
         groups[ticket.status].push(ticket);
         return groups;
      }, {});
   } else if (displayOption === "user") {
      groupedAndSortedTickets = filteredTickets.reduce((groups, ticket) => {
         if (!groups[ticket.userId]) {
            groups[ticket.userId] = [];
         }
         groups[ticket.userId].push(ticket);
         return groups;
      }, {});
   } else if (displayOption === "priority") {
      groupedAndSortedTickets = filteredTickets.reduce((groups, ticket) => {
         if (!groups[ticket.priority]) {
            groups[ticket.priority] = [];
         }
         groups[ticket.priority].push(ticket);
         return groups;
      }, {});
   }

   // Sort the tickets within each group based on priority or title
   for (const group in groupedAndSortedTickets) {
      if (groupedAndSortedTickets.hasOwnProperty(group)) {
         if (group === "4" || group === "3" || group === "2" || group === "1") {
            groupedAndSortedTickets[group].sort(
               (a, b) => b.priority - a.priority
            );
         } else {
            groupedAndSortedTickets[group].sort((a, b) =>
               a.title.localeCompare(b.title)
            );
         }
      }
   }

   return (
      <div className="container">
         {/* Kanban columns */}
         <div className="row">
            {Object.keys(groupedAndSortedTickets).map((group, index) => (
               <KanbanColumn
                  key={index}
                  title={group}
                  tickets={filteredTickets.filter(
                     (ticket) => ticket.status === group
                  )}
               />
            ))}
         </div>
      </div>
   );
};

export default KanbanBoard;
