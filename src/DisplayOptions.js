import React from "react";

const DisplayOptions = ({
   displayOption,
   onSelectDisplayOption,
   setSelectedStatus,
   statusOptions,
   setSelectedPriority,
   users,
   setSelectedUser,
   priorityOptions,
   getPriorityLabel,
}) => {
   return (
      <div className="display-options">
         <select
            value={displayOption}
            onChange={(e) => onSelectDisplayOption(e.target.value)}
         >
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
         </select>
         {displayOption === "user" && (
            <select
               value={setSelectedUser}
               onChange={(e) => setSelectedUser(e.target.value)}
            >
               <option value="all">All Users</option>
               {users.map((user) => (
                  <option key={user.id} value={user.id}>
                     {user.name}
                  </option>
               ))}
            </select>
         )}
         {displayOption === "priority" && (
            <select
               value={setSelectedPriority}
               onChange={(e) => setSelectedPriority(e.target.value)}
            >
               <option value="all">All Priorities</option>
               {priorityOptions.map((priority) => (
                  <option key={priority} value={priority}>
                     {getPriorityLabel(priority)}
                  </option>
               ))}
            </select>
         )}

         {displayOption === "status" && (
            <select
               value={setSelectedStatus}
               onChange={(e) => setSelectedStatus(e.target.value)}
            >
               <option value="all">All Statuses</option>
               {statusOptions.map((status) => (
                  <option key={status} value={status}>
                     {status}
                  </option>
               ))}
            </select>
         )}
      </div>
   );
};

export default DisplayOptions;
