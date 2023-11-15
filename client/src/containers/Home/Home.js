import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  CssBaseline,
  CircularProgress,
} from "@mui/material";
import SearchBar from "../../components/SearchBar/SearchBar";
import AdvertisersTable from "../../components/AdvertiserTable/AdvertisersTable";
import { getAds } from "../../services/adsService";
import DataSummary from "../../components/DataSummary/DataSummary";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";

function Home() {
  const [loading, setLoading] = useState(false);
  const [advertisers, setAdvertisers] = useState([]);
  const [domain, setDomain] = useState("");
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [adsCount, setAdsCount] = useState(0);
  const [advertiserCount, setAdvertiserCount] = useState(0);
  const [parseTime, setParseTime] = useState(null);
  const [parseErrors, setParseErrors] = useState(null);
  const [fromCache, setFromCache] = useState(false);
  const [error, setError] = useState(null);

  const handleParse = async (domainInput) => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors

      const data = await getAds(domainInput);
      console.log(data);
      setAdvertisers(data.advertisers);
      setDomain(data.domain);
      setParseTime(data.parseTime);
      setFromCache(data.fromCache);
      setAdsCount(data.totalAds);
      setParseErrors(data.parseErrors);
      setAdvertiserCount(data.totalAdvertisers);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar>
          <Typography variant="h4" component="div">
            Ads.txt Crawler
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <SearchBar handleParse={handleParse} loading={loading} />

        {loading ? (
          <CircularProgress
            style={{ marginTop: 20, alignSelf: "center" }}
            size={40}
          />
        ) : (
          <>
            {error ? (
              <ErrorMsg msg={error.message} />
            ) : (
              <Card variant="outlined" sx={{ marginBottom: 3 }}>
                <CardContent>
                  <DataSummary
                    domain={domain}
                    advertiserCount={advertiserCount}
                    adsCount={adsCount}
                    fromCache={fromCache}
                    parseTime={parseTime}
                    parseErrors={parseErrors}
                  />

                  <AdvertisersTable
                    advertisers={advertisers}
                    adsCount={adsCount}
                    advertiserCount={advertiserCount}
                    selectedDomains={selectedDomains}
                    // handleClick={handleClick}
                    loading={loading}
                  />
                </CardContent>
              </Card>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default Home;
