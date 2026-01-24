import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../redux/slices/fileSlice';
import { toast } from 'react-toastify';
import { FiUpload, FiX } from 'react-icons/fi';
import '../styles/Upload.scss';

const Upload = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uploading } = useSelector((state) => state.files);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    fileName: '',
    tags: '',
    description: ''
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file size (100MB)
      if (selectedFile.size > 100 * 1024 * 1024) {
        toast.error('File size must be less than 100MB');
        return;
      }

      setFile(selectedFile);
      setFormData({ ...formData, fileName: selectedFile.name });

      // Create preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error('Please select a file');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('fileName', formData.fileName);
    uploadData.append('tags', formData.tags);
    uploadData.append('description', formData.description);

    try {
      await dispatch(uploadFile(uploadData)).unwrap();
      toast.success('File uploaded successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error || 'Upload failed');
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    setFormData({ fileName: '', tags: '', description: '' });
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h1>Upload File</h1>
        <p className="upload-subtitle">Share your multimedia files</p>

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="file-input-container">
            {!file ? (
              <label className="file-input-label">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,video/*,audio/*,.pdf"
                  className="file-input"
                />
                <div className="file-input-content">
                  <FiUpload size={48} />
                  <p>Click to select a file</p>
                  <span>Images, Videos, Audio, or PDFs (Max 100MB)</span>
                </div>
              </label>
            ) : (
              <div className="file-preview">
                {preview && (
                  <img src={preview} alt="Preview" className="preview-image" />
                )}
                <div className="file-info">
                  <p className="file-name">{file.name}</p>
                  <p className="file-size">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="remove-file-button"
                >
                  <FiX />
                </button>
              </div>
            )}
          </div>

          {file && (
            <>
              <div className="form-group">
                <label>File Name</label>
                <input
                  type="text"
                  name="fileName"
                  value={formData.fileName}
                  onChange={handleChange}
                  required
                  placeholder="Enter file name"
                />
              </div>

              <div className="form-group">
                <label>Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g., nature, landscape, sunset"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Add a description for your file"
                />
              </div>

              <button
                type="submit"
                className="upload-button"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Upload File'}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Upload;
