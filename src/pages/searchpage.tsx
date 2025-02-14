import "@/styles/search-styles.css";
import Post from "@/components/post";
import postData from "@/mockdata/post-data";

export default function SearchPage() {
    return (
    <div className="outer-search-container">
        <div className="search-container">
            <div className="outer-search-body">
                <div className="search-body">
                    <label htmlFor="keywords">Keywords: </label>
                    <input type="text" id="keywords" name="keywords" className="field-clicked" />
                    <label htmlFor="tags">Tags: </label>
                    <input type="text" id="tags" name="tags" className="field-clicked" />
                    <label htmlFor="sort-by">Sort by: </label>
                    <select name="sort-by" id="sort-by">
                        <option value="recent">Most Recent</option>
                        <option value="liked">Most Liked</option>
                    </select>
                    <label htmlFor="filter-by">Filter by Time: </label>
                    <select name="filter-by" id="filter-by">
                        <option value="today">Today</option>
                        <option value="week">Last Week</option>
                        <option value="month">Last Month</option>
                        <option value="NA">None</option>
                    </select>
                    <button className="search-buttons">Clear</button>
                    <button className="search-buttons">Search</button>
                </div>
            </div>
            <div className="search-list">
                <div className="search-results">Results: </div>
                <div className="search-posts">
                    <br />
                    <Post post={postData}/>
                    <br />
                    <Post post={postData}/>
            </div>
        </div>
        </div>
    </div>
    );
}