import axios from "axios";
import { useEffect, useState } from "react";
import FooterComponent from "../footerComponent/FooterComponent";
import HeaderComponent from "../headerComponent/HeaderComponent";

export default function OurEventComponent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const value = sessionStorage.getItem("user");

    if (!value) {
      setError("User not logged in or session expired.");
      setLoading(false);
      return;
    }

    const jsObject = JSON.parse(value);
    const userId = jsObject?._id;

    if (!userId) {
      setError("Invalid user data.");
      setLoading(false);
      return;
    }

    const fetchEvents = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/event/ourEvent",
          { userId }
        );
        setEvents(response.data.allEvents);
      } catch (err) {
        setError("Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const formatDate = (isoDate) => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0];
  };

  if (loading) {
    return (
      <>
        <HeaderComponent />
        <p>Loading events...</p>
        <FooterComponent />
      </>
    );
  }

  if (error) {
    return (
      <>
        <HeaderComponent />
        <p>Error: {error}</p>
        <FooterComponent />
      </>
    );
  }

  return (
    <>
      <HeaderComponent />
      <h2 className="mt-4 mb-2">Event List</h2>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.no</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Location</th>
              <th scope="col">Capacity</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event._id || index}>
                <td>{index + 1}</td>
                <td>{event.title || "N/A"}</td>
                <td>{event.description || "N/A"}</td>
                <td>{formatDate(event.date)}</td>
                <td>{event.time || "N/A"}</td>
                <td>{event.location || "N/A"}</td>
                <td>{event.capacity || "N/A"}</td>
                <td>
                  <button className="btn btn-primary">edit</button>
                </td>
                <td>
                  <button className="btn btn-danger">delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <FooterComponent />
    </>
  );
}



// import axios from "axios";
// import { useEffect, useState } from "react";
// import FooterComponent from "../footerComponent/FooterComponent";
// import HeaderComponent from "../headerComponent/HeaderComponent";

// export default function OurEventComponent() {
//   // for set the event
//   const [events, setEvents] = useState([]);
//   // State to handle loading and error
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // for the getting the our events
//   useEffect(() => {
//     const value = sessionStorage.getItem("user");

//     const jsObject = JSON.parse(value);
//     // console.log(jsObject);
//     const userId = jsObject._id;
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.post(
//           "http://localhost:3000/event/ourEvent",
//           { userId }
//         );
//         setEvents(response.data.allEvents);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvents();
//   }, []); // for render the data only one time

//   // Function to format date
//   const formatDate = (isoDate) => {
//     if (!isoDate) return "N/A"; // Handle missing date
//     const date = new Date(isoDate);
//     return date.toISOString().split("T")[0]; // Extract only the date part
//   };

//   return (
//     <>
//       <HeaderComponent />
//       <h2 className="mt-4 mb-2">Event List.....</h2>

//       <table className="table">
//         <thead>
//           <tr>
//             <th scope="col">S.no</th>
//             <th scope="col">Title</th>
//             <th scope="col">Description</th>
//             <th scope="col">Date</th>
//             <th scope="col">Time</th>
//             <th scope="col">Location</th>
//             <th scope="col">Capacity</th>
//             <th scope="col">Edit</th>
//             <th scope="col">Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {events.map((event, index) => (
//             <tr key={event.id || index}>
//               <td>{index + 1}</td>
//               <td>{event.title || "N/A"}</td>
//               <td>{event.description || "N/A"}</td>
//               <td>{formatDate(event.date) || "N/A"}</td>
//               <td>{event.time || "N/A"}</td>
//               <td>{event.location || "N/A"}</td>
//               <td>{event.capacity || "N/A"}</td>
//               <td>
//                 <button className="btn btn-primary">edit</button>
//               </td>
//               <td>
//                 <button className="btn btn-danger">delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <FooterComponent />
//     </>
//   );
// }
