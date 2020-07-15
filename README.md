# RingCentral Token Refresh experiment

RingCentral Token Refresh experiment


## conclusion

After token refresh, old access token becomes invalid immediately while refresh token remains valid.

### access token

If you try to use the old access token right after the refreshing, error message is "Access token corrupted". 

About 10 seconds later, using the old access token generates the error message "Token not found"


### Refresh token

Refresh token remains valid after token refreshing.
