#include<bits/stdc++.h>
using namespace std;
int mod=1e9+7;
int dp[1000000];
int calc(int n){
    if(n==0) return 1;
    if(n<0) return 0;
    if(dp[n]!=-1) return dp[n];
    return dp[n]=calc(n-1)+calc(n-2);
    
}
int main(){
    int n;
    cin>>n;
    memset(dp,-1,sizeof(dp));
    cout<<calc(n)+1<<endl;
}