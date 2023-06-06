#include<bits/stdc++.h>
using namespace std;
int main(){
    int t;
    cin>>t;
    while(t--){
        int n;
        cin>>n;
        vector<vector<int>>ar;
        map<int,vector<int>>m;
        for(int i=0;i<n;i++){
            int Ai,Bi;
            cin>>Ai>>Bi;
             m[Ai].push_back(Bi);
        }
        long long ans=0LL;
        for(auto &i:m)
            sort(i.second.begin(),i.second.end(),greater<int>());
        
        for(int i=n;i>=1;i--){
            if(!m.count(i))
                continue;
            for(int j=0;j<m[i].size();j++){
                if(j>=i) break;
                ans+=m[i][j];
            }
        }
        

        //cout<<"ans:"<<ans<<endl;
        cout<<ans<<endl;


        
       
    }

}

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