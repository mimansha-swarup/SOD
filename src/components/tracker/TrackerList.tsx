
// import { trackersList } from "@/constants/tracker";
// import { TRACKER } from "@/types/tracker";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import React from "react";

// const TrackerList = ({
//   selectedTracker,
//   setSelectedTracker,
// }: {
//   selectedTracker: TRACKER;
//   setSelectedTracker: (tracker: TRACKER) => void;
// }) => {
//   return (
//     <div className="flex flex-col-reverse mb-6  pb-2">
//       <Tabs
//         defaultValue={selectedTracker}
//         onValueChange={(value) => setSelectedTracker(value as TRACKER)}
//         className=" mx-auto"
//       >
//         <TabsList>
//           {trackersList.map((el) => (
//             <TabsTrigger key={el} value={el} className="rounded-lg px-3 py-1">
//               {el?.toUpperCase()}
//             </TabsTrigger>
//           ))}
//         </TabsList>
//       </Tabs>
//     </div>
//   );
// };

// export default TrackerList;
