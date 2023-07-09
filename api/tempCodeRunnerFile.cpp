#include<bits/stdc++.h>
using namespace std;


int main(){
    int t;
    cin>>t;
    while(t--){
        int n,m,h;
        cin>>n>>m>>h;
        vector<vector<long long >> v(n,vector<long long>(m,0));
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                cin>>v[i][j];
            }
        }
        vector<vector<long long>> ans;
        
        for(int i=0;i<v.size()  ;i++){
           sort(v[i].begin(),v[i].end());
            long long  prefix_sum=0LL;
              long long count=0LL;
              long long time_passed=0LL;
            for(auto j:v[i]){                
                prefix_sum=time_passed+prefix_sum+j;
                if(prefix_sum<h){
                    count++;
                }
                else{
                    prefix_sum-=time_passed-j;
                    break;
                }
                time_passed+=j;
            }
            ans.push_back({count,prefix_sum,i});
        }
        /*
            ans[i][0] = points
            ans[i][1] = pentalty
            ans[i][2] = index
        */
       // Sort such that the participant with the most points is ranked higher, and in case of a tie in points, the participant with the lower penalty is ranked higher.
        sort(ans.begin(),ans.end(),[](vector<long long> &a,vector<long long> &b){
            if(a[0]==b[0]){
                if(a[1]==b[1]){
                    if(a[2]==0)
                        return true;
                    else
                        return a[2]<b[2];
                }
                else{
                    return a[1]<b[1];
                }
            }
            else{
                return a[0]>b[0];
            }
        });
        for(int i=0;i<ans.size();i++){
           if(ans[i][2]==0){
               cout<<i+1<<endl;
              //cout<<"ANS : "<<i+1<<endl<<endl;
               break;
           }
        }
    }
}
/*
    Sort each ar[i]
    Find prefix sum till prefix sum < h and keep count in C
    store <c,i> in a vector
*/
