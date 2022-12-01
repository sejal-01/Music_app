import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';


const ArtistDetails= () => {

    const dispatch = useDispatch();  
    const { id: artistId } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetSongDetailsQuery({ artistId });
    
    const handlePauseClick = () => {
      dispatch(playPause(false));
    };
  
    const handlePlayClick = (song,i) => {
      dispatch(setActiveSong({ song, data, i }));
      dispatch(playPause(true));
    };
  
    if (isFetchingArtistDetails) return <Loader title="Loading art" />;

    if (error) return <Error />;
     
    return(

    <div className="flex flex-col">  
            <DetailsHeader
        artistId={artistId}
        artistData={artistData}
      /> 

        <div className="mb-10">
            <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        
        <div className="mt-5">
          {songData?.sections[1].type === 'LYRICS'
            ? songData?.sections[1]?.text.map((line, i) => (
              <p className="text-gray-400 text-base my-1">{line}</p>
            ))
            : (
              <p className="text-gray-400 text-base my-1">Sorry, No lyrics found!</p>
            )}
        </div>
        </div>

        <RelatedSongs />
        data={Object.values(artistData?.song)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        

         
        </div>
    );
    
 };

    export default ArtistDetails;


