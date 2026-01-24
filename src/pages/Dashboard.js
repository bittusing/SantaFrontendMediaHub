import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, deleteFile, incrementViewCount } from '../redux/slices/fileSlice';
import { toast } from 'react-toastify';
import FileCard from '../components/FileCard';
import FilePreviewModal from '../components/FilePreviewModal';
import '../styles/Dashboard.scss';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { files, loading, pagination } = useSelector((state) => state.files);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filterType, setFilterType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getFiles({ fileType: filterType, page: currentPage }));
  }, [dispatch, filterType, currentPage]);

  const handleDelete = async (fileId) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await dispatch(deleteFile(fileId)).unwrap();
        toast.success('File deleted successfully');
      } catch (error) {
        toast.error(error || 'Failed to delete file');
      }
    }
  };

  const handleView = (file) => {
    setSelectedFile(file);
    dispatch(incrementViewCount(file._id));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Files</h1>
        <div className="filter-controls">
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
            className="filter-select"
          >
            <option value="">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="audio">Audio</option>
            <option value="pdf">PDFs</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : files.length === 0 ? (
        <div className="empty-state">
          <p>No files found. Upload your first file!</p>
        </div>
      ) : (
        <>
          <div className="files-grid">
            {files.map((file) => (
              <FileCard
                key={file._id}
                file={file}
                onView={handleView}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {pagination.pages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {currentPage} of {pagination.pages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.pages}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          )}
        </>
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

export default Dashboard;
