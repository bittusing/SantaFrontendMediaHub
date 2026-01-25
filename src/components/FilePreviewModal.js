import React from 'react';
import { FiX, FiDownload, FiExternalLink } from 'react-icons/fi';
import '../styles/FilePreviewModal.scss';

const FilePreviewModal = ({ file, onClose }) => {

  const renderPreview = () => {
    // Log file type for debugging
    console.log('File type:', file.fileType, 'File:', file);
    
    const fileType = file.fileType?.toLowerCase();
    
    switch (fileType) {
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
          <div className="audio-player-container">
            <audio controls className="preview-audio" controlsList="nodownload">
              <source src={file.cloudinaryUrl} type={file.mimeType} />
              <source src={file.cloudinaryUrl} type="audio/mpeg" />
              <source src={file.cloudinaryUrl} type="audio/mp3" />
              Your browser does not support the audio tag.
            </audio>
          </div>
        );
      case 'pdf': {
        const pdfUrl = file.cloudinaryUrl;
        
        let previewImageUrl = pdfUrl;
        if (pdfUrl.includes('/upload/')) {
          previewImageUrl = pdfUrl.replace('/upload/', '/upload/pg_1,w_800/').replace('.pdf', '.jpg');
        }
        
        return (
          <div className="pdf-viewer">
            <div className="pdf-preview-container">
              <img 
                src={previewImageUrl} 
                alt={`${file.fileName} preview`}
                className="pdf-preview-image"
                style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="pdf-placeholder" style={{ display: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', color: 'white' }}>
                <FiExternalLink size={48} />
                <p style={{ marginTop: '1rem' }}>PDF Preview</p>
              </div>
            </div>
          </div>
        );
      }
      default: {
        // If file has cloudinaryUrl ending with .pdf, treat as PDF
        if (file.cloudinaryUrl && file.cloudinaryUrl.toLowerCase().includes('.pdf')) {
          const pdfUrl = file.cloudinaryUrl;
          let previewImageUrl = pdfUrl;
          if (pdfUrl.includes('/upload/')) {
            previewImageUrl = pdfUrl.replace('/upload/', '/upload/pg_1,w_800/').replace('.pdf', '.jpg');
          }
          
          return (
            <div className="pdf-viewer">
              <div className="pdf-preview-container">
                <img 
                  src={previewImageUrl} 
                  alt={`${file.fileName} preview`}
                  className="pdf-preview-image"
                  style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="pdf-placeholder" style={{ display: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', color: 'white' }}>
                  <FiExternalLink size={48} />
                  <p style={{ marginTop: '1rem' }}>PDF Preview</p>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="preview-unavailable">
            <p>Preview not available for this file type.</p>
            <p style={{ fontSize: '0.8rem', color: '#999' }}>Type: {file.fileType || 'unknown'}</p>
            <a 
              href={file.cloudinaryUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="pdf-action-button"
              style={{ marginTop: '1rem' }}
            >
              <FiExternalLink /> Open File
            </a>
          </div>
        );
      }
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
