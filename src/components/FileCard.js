import React from 'react';
import { FiEye, FiTrash2, FiFile, FiImage, FiVideo, FiMusic } from 'react-icons/fi';
import '../styles/FileCard.scss';

const FileCard = ({ file, onView, onDelete, showRelevance }) => {
  const getFileIcon = () => {
    switch (file.fileType) {
      case 'image':
        return <FiImage size={24} />;
      case 'video':
        return <FiVideo size={24} />;
      case 'audio':
        return <FiMusic size={24} />;
      default:
        return <FiFile size={24} />;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="file-card">
      <div className="file-card-preview" onClick={() => onView(file)}>
        {file.fileType === 'image' ? (
          <img src={file.cloudinaryUrl} alt={file.fileName} />
        ) : (
          <div className="file-icon-container">
            {getFileIcon()}
          </div>
        )}
        <div className="file-card-overlay">
          <FiEye size={32} />
        </div>
      </div>

      <div className="file-card-content">
        <h3 className="file-card-title">{file.fileName}</h3>
        
        {file.tags && file.tags.length > 0 && (
          <div className="file-card-tags">
            {file.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="file-card-meta">
          <span>{formatFileSize(file.fileSize)}</span>
          <span>•</span>
          <span>{formatDate(file.createdAt)}</span>
        </div>

        <div className="file-card-stats">
          <span className="view-count">
            <FiEye /> {file.viewCount} views
          </span>
          {showRelevance && file.relevanceScore && (
            <span className="relevance-score">
              Score: {file.relevanceScore.toFixed(1)}
            </span>
          )}
        </div>

        {onDelete && (
          <button
            onClick={() => onDelete(file._id)}
            className="delete-button"
            title="Delete file"
          >
            <FiTrash2 />
          </button>
        )}
      </div>
    </div>
  );
};

export default FileCard;
