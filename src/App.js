import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import DisplayOptions from "./DisplayOptions";
import KanbanColumn from "./KanbanColumn";
import "./App.css";
import "./DisplayOptions.css";

const App = () => {
   const [tickets, setTickets] = useState([]);
   const [displayOption, setDisplayOption] = useState("status");
   const [selectedUser, setSelectedUser] = useState("all"); // 'all' represents no user filter
   const [selectedStatus, setSelectedStatus] = useState("all"); // 'all' represents no status filter
   const [users, setUsers] = useState([]);
   const [statusOptions, setStatusOptions] = useState([]);
   const [selectedPriority, setSelectedPriority] = useState("all");
   const [priorityOptions, setPriorityOptions] = useState([0, 1, 2, 3, 4]);

   useEffect(() => {
      axios
         .get("https://api.quicksell.co/v1/internal/frontend-assignment")
         .then((response) => {
            setTickets(response.data.tickets);
            setUsers(response.data.users);

            const uniqueStatuses = [
               ...new Set(response.data.tickets.map((ticket) => ticket.status)),
            ];
            setStatusOptions(["all", ...uniqueStatuses]);

            const uniquePriorities = [
               ...new Set(
                  response.data.tickets.map((ticket) => ticket.priority)
               ),
            ];
            setPriorityOptions(["all", ...uniquePriorities]);
         })
         .catch((error) => {
            console.error("Error fetching data:", error);
         });
   }, []);

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

   const onSelectDisplayOption = (option) => {
      setDisplayOption(option);
   };

   const filteredTickets = tickets.filter((ticket) => {
      const userFilter =
         selectedUser === "all" || ticket.userId === selectedUser;
      const statusFilter =
         selectedStatus === "all" || ticket.status === selectedStatus;
      const priorityFilter =
         selectedPriority === "all" ||
         ticket.priority === Number(selectedPriority);

      return userFilter && statusFilter && priorityFilter;
   });
   return (
      <div className="container mt-5">
         <h1>Kanban Board App</h1>
         <div className="kanban-board">
            <DisplayOptions
               displayOption={displayOption}
               onSelectDisplayOption={onSelectDisplayOption}
               setSelectedPriority={setSelectedPriority}
               setSelectedUser={setSelectedUser}
               users={users}
               priorityOptions={priorityOptions}
               getPriorityLabel={getPriorityLabel}
               setSelectedStatus={setSelectedStatus}
               statusOptions={statusOptions}
            />
            <KanbanColumn
               title={
                  displayOption === "priority" ? "Unknown Priority" : "Todo"
               }
               tickets={filteredTickets.filter(
                  (ticket) => ticket.status === "Todo"
               )}
            >
               {" "}
               {filteredTickets
                  .filter((ticket) => ticket.status === "Todo")
                  .map((ticket) => (
                     <Card key={ticket.id} ticket={ticket} />
                  ))}
            </KanbanColumn>
            <KanbanColumn
               title={displayOption === "priority" ? "High" : "In Progress"}
               tickets={filteredTickets.filter(
                  (ticket) => ticket.status === "In Progress"
               )}
            >
               {filteredTickets
                  .filter((ticket) => ticket.status === "In Progress")
                  .map((ticket) => (
                     <Card key={ticket.id} ticket={ticket} />
                  ))}
            </KanbanColumn>

            <KanbanColumn
               title={displayOption === "priority" ? "Low" : "Backlog"}
               tickets={filteredTickets.filter(
                  (ticket) => ticket.status === "Backlog"
               )}
            >
               {filteredTickets
                  .filter((ticket) => ticket.status === "Backlog")
                  .map((ticket) => (
                     <Card key={ticket.id} ticket={ticket} />
                  ))}
            </KanbanColumn>
            <KanbanColumn
               title={displayOption === "priority" ? "Medium" : "Completed"}
               tickets={filteredTickets.filter(
                  (ticket) => ticket.status === "Completed"
               )}
            >
               {" "}
               {filteredTickets
                  .filter((ticket) => ticket.status === "Completed")
                  .map((ticket) => (
                     <Card key={ticket.id} ticket={ticket} />
                  ))}
            </KanbanColumn>
            <KanbanColumn
               title={displayOption === "priority" ? "Urgent" : ""}
               tickets={filteredTickets.filter(
                  (ticket) => ticket.status === "Completed"
               )}
            >
               {" "}
               {filteredTickets
                  .filter((ticket) => ticket.status === "Completed")
                  .map((ticket) => (
                     <Card key={ticket.id} ticket={ticket} />
                  ))}
            </KanbanColumn>
         </div>
      </div>
   );
};

export default App;
