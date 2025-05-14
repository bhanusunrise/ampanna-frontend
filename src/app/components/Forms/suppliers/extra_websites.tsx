'use client';

import React from 'react';
import { Table, Button } from 'react-bootstrap';
import TextInput from '../text_input'; 

interface ExtraWebsitesProps {
  websites: string[];
  onWebsiteChange: (index: number, newUrl: string) => void;
  onAddWebsite: () => void;
  onRemoveWebsite: (index: number) => void;
}

const ExtraWebsites: React.FC<ExtraWebsitesProps> = ({ websites, onWebsiteChange, onAddWebsite, onRemoveWebsite }) => {
  return (
    <div>
      <Table>
        <tbody>
          {websites.map((website, index) => (
            <tr key={index} className='pt-4'>
              <td>
                <TextInput
                  form_id={`website-url-${index}`}
                  placeholder_text="https://example.com"
                  value={website}
                  onChangeText={(e) => onWebsiteChange(index, e.target.value)}
                />
              </td>
              <td>
                <Button variant="danger" onClick={() => onRemoveWebsite(index)} className="btn-sm">
                  🗑️
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={onAddWebsite} variant="primary" className="mb-2">
        +
      </Button>
    </div>
  );
};

export default ExtraWebsites;