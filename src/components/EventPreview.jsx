import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import "./EventPreview.css";

function EventPreview() {
  const [event, setEvent] = useState([]);
  const [html, setHTML] = useState({__html: ""});
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();

  const url = `https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2?include=image,location,eventSchedule,dc:classification.skos:inScheme&token=9962098a5f6c6ae8d16ad5aba95afee0&page[size]=10&page[number]=1&filter[q]=${slug}`;

  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEvent(data["@graph"]);
        setHTML({__html: data["@graph"][0]?.description})
        setLoading(false);
      });
  }, []);

  const lastElementClassification =
    event[0]?.["dc:classification"][event[0]?.["dc:classification"].length - 1];

  const startDate = new Date(event[0]?.startDate);
  const endDate = new Date(event[0]?.endDate);
  const startTime = startDate.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Vienna",
  });
  const endTime = endDate.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Vienna",
  });

  if (!loading) {
    document.getElementById("firstload")?.remove();
  } else {
    return <div></div>;
  }

  return (
    <div className="event-preview-wrap">
      <a href="/">Zurück</a>
      
      {/* {loading && <div><span className="load"></span></div>} */}
      {!loading && event.length === 0 && (
        <div className="nothing">Keine Veranstaltungen gefunden</div>
      )}
      {!loading && event.length > 0 && (
        <div>
          <h1>{event[0].name}</h1>
          <div className="category">
            {/* <TagIcon class="icon" /> */}
            <div className="category-title">
              {lastElementClassification?.["skos:prefLabel"]}
            </div>
          </div>
          <div className="date-row">
            {/* <CalendarDaysIcon class="icon" /> */}
            <div className="date-wrap">
              <div className="date-period">
                {startDate.toLocaleDateString("de-DE")} -{" "}
                {endDate.toLocaleDateString("de-DE")}
              </div>
              {startTime === endTime && <div className="date-time">{startTime}</div>}
              {startTime !== endTime && (
                <div className="date-time">
                  {startTime} - {endTime}
                </div>
              )}
            </div>
          </div>
          <div className="location">
            {/* <MapPinIcon class="icon" /> */}
            <div>
              <strong>{event[0]?.location[0]?.name}</strong>
            </div>
          </div>
          <div className="content">
            <img src={event[0]?.image[0]?.thumbnailUrl} alt="image of event" />
            <div dangerouslySetInnerHTML={html} />
          </div>
        </div>
      )}
      <a href="/">Zurück</a>
    </div>
  );
}

export default EventPreview;
