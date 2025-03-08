import axios from 'axios';
import React from 'react';
import './NewsApi.css';

class NewsApi extends React.Component {
    constructor(props) {
        super(props);
        this.state = { articles: [] };
    }

    componentDidMount() {
        axios.get("https://newsapi.org/v2/top-headlines", {
            params: {
                country: 'us',
                apiKey: '8d3d211042334b818fa2a79ac2f9efb5' 
            }
        })
        .then(res => {
            this.setState({ articles: res.data.articles });
        })
        .catch(error => {
            console.error("Error fetching news data:", error);
        });
    }

    render() {
        return (
            <div className="news-container">
                {this.state.articles.map((article, index) => (
                    <div key={index} className="news-card">
                        {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="news-image" />}
                        <h2 className="news-title">{article.title}</h2>
                        <p className="news-description">{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">Read More</a>
                    </div>
                ))}
            </div>
        );
    }
}

export default NewsApi;
