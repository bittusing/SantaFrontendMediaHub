import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchFiles, incrementViewCount, clearSearchResults } from '../redux/slices/fileSlice';
import { FiSearch } from 'react-icons/fi';
import FileCard from '../components/FileCard';
import FilePreviewModal from '../components/FilePreviewModal';
import '../styles/Search.scss';

const Search = () => {
  const dispatch = useDispatch();
  const { searchResults, loading } = useSelector((state) => state.files);

  const [query, setQuery] = useState('');
  const [fileType, setFileType] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedFile, setSelectedFile] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchFiles({ query, fileType, sortBy }));
      setHasSearched(true);
    }
  };

  const handleClear = () => {
    setQuery('');
    setFileType('');
    setSortBy('relevance');
    setHasSearched(false);
    dispatch(clearSearchResults());
  };

  const handleView = (file) => {
    setSelectedFile(file);
    dispatch(incrementViewCount(file._id));
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h1>Search Files</h1>
        <p>Find your multimedia files quickly</p>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <FiSearch className="search-icon" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by file name, tags, or description..."
            className="search-input"
          />
        </div>

        <div className="search-filters">
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className="filter-select"
          >
            <option value="">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="audio">Audio</option>
            <option value="pdf">PDFs</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="date">Sort by Date</option>
            <option value="views">Sort by Views</option>
          </select>

          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>

          {hasSearched && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-button"
            >
              Clear
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : hasSearched ? (
        searchResults.length === 0 ? (
          <div className="empty-state">
            <p>No files found matching your search.</p>
          </div>
        ) : (
          <div className="search-results">
            <p className="results-count">
              Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
            </p>
            <div className="files-grid">
              {searchResults.map((file) => (
                <FileCard
                  key={file._id}
                  file={file}
                  onView={handleView}
                  showRelevance={sortBy === 'relevance'}
                />
              ))}
            </div>
          </div>
        )
      ) : (
        <div className="search-placeholder">
          <FiSearch size={64} />
          <p>Enter a search query to find files</p>
        </div>
      )}

      {selectedFile && (
        <FilePreviewModal
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </div>
  );
};

export default Search;
