#include<bits/stdc++.h>
using namespace std;
int mod=1e9+7;

int  calc(vector<int> &v,int n,int x){
    if(x==0) return 0;
    if(x<0) return 1e9;
    if(n<0) return 1e9;
    return min(calc(v,n-1,x),1+calc(v,n,x-v[n]));

    
   
}
int main(){
    int n,x;
    cin>>n>>x;
    vector<int> v(n);
    for(int i=0;i<n;i++) cin>>v[i];
    sort(v.begin(),v.end());
    vector<int>dp(x+1,1e9);
    int ans=0;
    dp[0]=0;
    for(int i=1;i<=x;i++){
        for(int j=0;j<n;j++){
            if(i-v[j]>=0){
                dp[i]=min(dp[i],1+dp[i-v[j]]);
            }
        }
    }
    if(dp[x]==1e9) cout<<-1<<endl;
    else cout<<dp[x]<<endl;
}
//6 -> 32

/*
5
3 4
3 1
2 5
3 2
3 3

2 -> 5
3 -> 4,3,2,1


6
1 2
3 4
1 4
3 4
3 5
2 3

1 -> 4,2
2 -> 3
3 -> 5,4,4

*/



/*
int n;
    cin>>n;
    while(n--){
        string s;
        cin>>s;
        unordered_map<string,int> m;
        for(int i=0;i<s.size()-1;i+=2){
            string x=s.substr(i,2);
            m[x]++;
        }
        int ans=0;
        cout<<(m.size()*2)<<endl;
    }
*/