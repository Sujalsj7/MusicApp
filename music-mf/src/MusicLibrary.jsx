import React, { useState } from "react";
import initialSongs from "./songs";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Button,
  CardActions,
  Modal,
} from "@mui/material";

export default function MusicLibrary({ user, logout }) {
  const [songs, setSongs] = useState(initialSongs);

 
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSong, setNewSong] = useState({ title: "", artist: "", album: "" });

 
  const handleDelete = (songToDelete) => {
    setSongs((prev) => prev.filter((s) => s.title !== songToDelete.title));
  };

  const handleAddSong = () => {
    if (!newSong.title || !newSong.artist || !newSong.album) return;
    setSongs((prev) => [...prev, newSong]);
    setNewSong({ title: "", artist: "", album: "" });
    setIsModalOpen(false);
  };

  let filteredSongs = songs.filter((song) =>
    filterField && filterValue
      ? song[filterField].toLowerCase().includes(filterValue.toLowerCase())
      : true
  );

 
  if (sortBy) filteredSongs.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  
  let groupedSongs = {};
  if (groupBy) {
    filteredSongs.forEach((song) => {
      const key = song[groupBy];
      if (!groupedSongs[key]) groupedSongs[key] = [];
      groupedSongs[key].push(song);
    });
  }

  return (
    <Box sx={{ bgcolor: "white", width: "100%", minHeight: "100vh" }}>
     
      <AppBar position="static" sx={{ bgcolor: "#000" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Music List</Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

    
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Hello {user?.username}, enjoy the music!
        </Typography>

     
        {user?.role === "admin" && (
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => setIsModalOpen(true)}
          >
            Add Song
          </Button>
        )}

        
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
              boxShadow: 24,
              width: { xs: "90%", sm: 400 },
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Add New Song
            </Typography>
            <TextField
              fullWidth
              label="Title"
              sx={{ mb: 2 }}
              value={newSong.title}
              onChange={(e) =>
                setNewSong({ ...newSong, title: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Artist"
              sx={{ mb: 2 }}
              value={newSong.artist}
              onChange={(e) =>
                setNewSong({ ...newSong, artist: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Album"
              sx={{ mb: 2 }}
              value={newSong.album}
              onChange={(e) =>
                setNewSong({ ...newSong, album: e.target.value })
              }
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleAddSong}>
                Add
              </Button>
            </Box>
          </Box>
        </Modal>

       
        <Grid container spacing={1} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} sx={{ minWidth: 250 }}>
            <FormControl fullWidth>
              <InputLabel>Filter Field</InputLabel>
              <Select
                value={filterField}
                label="Filter Field"
                onChange={(e) => {
                  setFilterField(e.target.value);
                  setFilterValue("");
                }}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="artist">Artist</MenuItem>
                <MenuItem value="album">Album</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ minWidth: 250 }}>
            <TextField
              fullWidth
              label="Filter Value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              disabled={!filterField}
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ minWidth: 250 }}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="artist">Artist</MenuItem>
                <MenuItem value="album">Album</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ minWidth: 250 }}>
            <FormControl fullWidth>
              <InputLabel>Group By</InputLabel>
              <Select
                value={groupBy}
                label="Group By"
                onChange={(e) => setGroupBy(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="artist">Artist</MenuItem>
                <MenuItem value="album">Album</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

       
        <Grid container direction="column" spacing={2}>
          {(groupBy ? Object.entries(groupedSongs) : [["All Songs", filteredSongs]]).map(
            ([groupName, groupSongs]) => (
              <Box key={groupName} sx={{ width: "100%", mb: 3 }}>
                {groupBy && (
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {groupName}
                  </Typography>
                )}

                {groupSongs.map((song, index) => (
                  <Card
                    key={index}
                    sx={{
                      width: "100%",
                      p: 2,
                      mb: 2,
                      boxShadow: 3,
                      borderRadius: 2,
                      "&:hover": { boxShadow: 6 },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle1">{song.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Artist: {song.artist} | Album: {song.album}
                        </Typography>
                      </Box>

                      {user?.role === "admin" && (
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleDelete(song)}
                        >
                          Delete
                        </Button>
                      )}
                    </Box>
                  </Card>
                ))}
              </Box>
            )
          )}
        </Grid>
      </Box>
    </Box>
  );
}
