# RingCentral Token Refresh experiment

RingCentral Token Refresh experiment


## access token

After token refresh, old access token **becomes invalid immediately**.

If you try to use the old access token right after the refreshing, error message is **"Access token corrupted"**. 

About 10 seconds, using the old access token generates error message **"Token not found"**.


## Refresh token

After token refresh, old refresh token remains valid for a while.

If you **use the new access token**, old refresh token will become invalid in **10 seconds**. 
Within 10 seconds, you can refresh **as many times as you want**.
But every time you refresh you will get the **same access token**. 
After 10 seconds, refresh it will generate error message **"Token not found"**.

If you **don't use the new access token**, old refresh token will remain valid for **at least 60 minutes** (I don't know the maximum value).
You can refresh **as many times as you want**.
But every time you refresh you will get the **same access token**. 
It **doesn't make much sense** to refresh it again and again because every time you get the same access token and if you use the access token the refresh token will become invalid in 10 seconds.

Even an old refresh token remains valid for a while, every time you refresh you will get the **same access token**. 
Which means, the server side simply gives you **cached value of the first refresh**.
This is **by design**, in case that you did the fresh but failed to receive the result due to network issues.
