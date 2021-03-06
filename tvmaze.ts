import axios from "axios";
import * as $ from "jquery";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");

const API_BASE_URL = "https://api.tvmaze.com/search/shows";

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

// ADD: Remove placeholder & make request to TVMaze search shows API.

// Questions: what is the difference between Show?

interface Show {
  id: number;
  name: string;
  summary: string;
  image: string;
}

async function getShowsByTerm(term: string): Promise<Show[]> {
  const response = await axios.get(`${API_BASE_URL}?q=${term}`);
  const shows = response.data.map((showData: { show: Show }) => showData.show);
  return shows;
}

/** Given list of shows, create markup for each and to DOM */

function populateShows(shows: Show[]): void {
  $showsList.empty();

  for (let show of shows) {
    console.log(show);
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src="http://static.tvmaze.com/uploads/images/medium_portrait/160/401704.jpg"
              alt="Bletchly Circle San Francisco"
              class="w-25 mr-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `
    );

    $showsList.append($show);
  }
}

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  // QUESTION: what is  "as" doing ?
  const term = $("#searchForm-term").val() as string;
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {}

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }
