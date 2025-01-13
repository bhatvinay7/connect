import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import useAxiosPrivate from "../../../src/fetch/useAxiosPrivate.js";
import jsonToCSV from "../fetch/Json2csv.js";
export default function EventInfoDownlode(){
  const axiosPrivate = useAxiosPrivate()
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [searchResponse, setSearchResponse] = useState([]);
  const [select, setSelected] = useState("");
  const [selectedEventData, setSelectedEventInfo] = useState(null);
  const [isLoading, setLoading] = useState("false")
  const [downlodeStatus, setDownlodeStatus] = useState("");
  const [isDownLoding, setDownLoading] = useState(false)
  const [downlode, setDownlode] = useState("")
  
  useEffect(() => {
   async function fetchData(){
    setDownLoading(true)
    const response=await jsonToCSV(selectedEventData)
      // Convert JSON to CSV string
      // Create a blob for the CSV file
      const blob = new Blob([response], { type: 'text/csv' });
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
  
      // Create a temporary <a> element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'data.csv'; // The filename for the downloaded file
  
      // Trigger the download
      link.click();
      selectedEventData(null)
      // Clean up the URL object
      URL.revokeObjectURL(url);
   }

    try {
      if (selectedEventData) {
        setDownLoading(true)
        fetchData()
      }
    } catch (err) {
      setDownlode(`Unable to downlode,error ocured ${err.message}`)
    }
    finally {
      setDownLoading(false)
    }

  }, [downlode])


  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(query)
    }, 300)
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(()=> {
    async function fetchData() {
      const response = await axiosPrivate.post(`/api/event/search?search=${encodeURIComponent(search)}`, {});
      setSearchResponse(response.data)
    }
    try {
      if (search) {
        fetchData()
      }

    }
    catch (err) {
      setErrorResponse(err.response?.data)
    }
  }, [search])


  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const response = await axiosPrivate.get(`/api/registrationinfo?select=${encodeURIComponent(select)}`);
      setSelectedEventInfo(response.data)
      setLoading(false)
      console.log(response.data)
    }
    try {
      if (select) {
        fetchData()
      }
    }
    catch (err) {

      setErrorResponse(err.response?.data)
    }
    finally {
      setLoading(false)
    }
  }, [search])


  // Handle download
  const handleDownload = () => {
    if (!select) {
      alert("Please select an event first.");
      return;
    }
    setDownlode(!downlode)
  }
  return (
    <div className="w-full` min-h-screen   p-6 bg-black ">
      <h1 className="text-2xl font-bold text-slate-200 mb-4">Event Search & Download</h1>
      <div className=" w-full flex items-center justify-center gap-2 ">
        <div className="w-4/5 flex flex-col h-auto gap-y-2 ">

          <input
            type="text"
            placeholder="Search events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />

          <div className="w-full rounded-sm border flex flex-col border-blue-200/45">
            {isLoading || isDownLoding ? <div className="bg-spinnerImg bg-center rounded-none w-4 h-4"></div> : downlode ? <p className="text-xs font-medium">{downlode}</p> : <></>}
            {selectedEventData ? <div className="w-fit h-auto max-auto">
              <p className="text-xs font-medium text-white p-2">You are reday to downlode the file</p>
            </div> : <></>}
            {Array.isArray(searchResponse) ? searchResponse?.map((each) => {
              return (
                <div key={each._id} onClick={() => {
                  setQuery(each.eventName)
                  setSelected(each.eventName)
                  setSearchResponse([])
                }} className="w-full p-2 text-slate-800 text-xs sm:text-base text-start bg-cyan-200/75 hover:bg-cyan-400/80">{each.eventName}</div>
              )
            }) : <></>}
          </div>
        </div>
        <div className="w-fit h-auto self-baseline ">
          <button
            onClick={handleDownload}
            className=" w-full flex items-center justify-center gap-x-1  px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            <span>Download</span>
            <FontAwesomeIcon className="text-xs sm:text-base" icon={faFileArrowDown} />
          </button>
        </div>


      </div>
    </div>
  );
}