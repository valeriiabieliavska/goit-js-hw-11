import './styles.css';
import axios, { Axios } from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const KEY = '31704253-3506fb69b26df966a85a65283';
const BASE_URL = 'https://pixabay.com/api/';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

