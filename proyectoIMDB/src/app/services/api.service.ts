import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {}

    // Fetch all items
    getItems(): Observable<any> {
        return this.http.get(`${this.apiUrl}/items`);
    }

    // Add a new item
    addItem(item: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/items`, item);
    }

    // Delete an item by ID
    deleteItem(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/items/${id}`);
    }
}
