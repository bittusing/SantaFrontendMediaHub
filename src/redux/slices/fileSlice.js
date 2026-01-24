import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fileService from '../../services/fileService';

const initialState = {
  files: [],
  currentFile: null,
  searchResults: [],
  loading: false,
  uploading: false,
  error: null,
  pagination: {
    page: 1,
    pages: 1,
    total: 0
  }
};

export const uploadFile = createAsyncThunk(
  'files/upload',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fileService.uploadFile(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Upload failed');
    }
  }
);

export const getFiles = createAsyncThunk(
  'files/getFiles',
  async (params, { rejectWithValue }) => {
    try {
      const response = await fileService.getFiles(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch files');
    }
  }
);

export const searchFiles = createAsyncThunk(
  'files/search',
  async (params, { rejectWithValue }) => {
    try {
      const response = await fileService.searchFiles(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Search failed');
    }
  }
);

export const deleteFile = createAsyncThunk(
  'files/delete',
  async (fileId, { rejectWithValue }) => {
    try {
      await fileService.deleteFile(fileId);
      return fileId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Delete failed');
    }
  }
);

export const incrementViewCount = createAsyncThunk(
  'files/incrementView',
  async (fileId, { rejectWithValue }) => {
    try {
      const response = await fileService.incrementViewCount(fileId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update view count');
    }
  }
);

const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Upload
      .addCase(uploadFile.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.uploading = false;
        state.files.unshift(action.payload.data);
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      })
      // Get Files
      .addCase(getFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.files = action.payload.data;
        state.pagination = {
          page: action.payload.page,
          pages: action.payload.pages,
          total: action.payload.total
        };
      })
      .addCase(getFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search
      .addCase(searchFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.data;
        state.pagination = {
          page: action.payload.page,
          pages: action.payload.pages,
          total: action.payload.total
        };
      })
      .addCase(searchFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.files = state.files.filter(file => file._id !== action.payload);
        state.searchResults = state.searchResults.filter(file => file._id !== action.payload);
      })
      // Increment View
      .addCase(incrementViewCount.fulfilled, (state, action) => {
        const fileIndex = state.files.findIndex(f => f._id === action.payload.data._id);
        if (fileIndex !== -1) {
          state.files[fileIndex] = action.payload.data;
        }
      });
  }
});

export const { clearError, clearSearchResults } = fileSlice.actions;
export default fileSlice.reducer;
