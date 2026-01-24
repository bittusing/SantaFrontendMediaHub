import React from 'react';
import { FiX, FiDownload } from 'react-icons/fi';
import '../styles/FilePreviewModal.scss';

const FilePreviewModal = ({ file, onClose }) => {
  const renderPreview = () => {
    switch (file.fileType) {
      case 'image':
        return <img src={file.cloudinaryUrl} alt={file.fileName} className="preview-image" />;
      case 'video':
        return (
          <video controls className="preview-video">
            <source src={file.cloudinaryUrl} type={file.mimeType} />
            Your browser does not support the video tag.
          </video>
        );
      case 'audio':
        return (
          <audio controls className="preview-audio">
            <source src={file.cloudinaryUrl} type={file.mimeType} />
            Your browser does not support the audio tag.
          </audio>
        );
      case 'pdf':
        return (
          <iframe
            src={file.cloudinaryUrl}
            title={file.fileName}
            className="preview-pdf"
          />
        );
      default:
        return <p>Preview not available for this file type.</p>;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FiX size={24} />
        </button>

        <div className="modal-preview">
          {renderPreview()}
        </div>

        <div className="modal-info">
          <h2>{file.fileName}</h2>
          
          {file.description && (
            <p className="file-description">{file.description}</p>
          )}

          {file.tags && file.tags.length > 0 && (
            <div className="file-tags">
              {file.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="file-details">
            <div className="detail-item">
              <span className="detail-label">Type:</span>
              <span className="detail-value">{file.fileType.toUpperCase()}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Size:</span>
              <span className="detail-value">
                {(file.fileSize / (1024 * 1024)).toFixed(2)} MB
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Uploaded:</span>
              <span className="detail-value">{formatDate(file.createdAt)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Views:</span>
              <span className="detail-value">{file.viewCount}</span>
            </div>
          </div>

          <a
            href={file.cloudinaryUrl}
            download={file.fileName}
            target="_blank"
            rel="noopener noreferrer"
            className="download-button"
          >
            <FiDownload /> Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default FilePreviewModal;
