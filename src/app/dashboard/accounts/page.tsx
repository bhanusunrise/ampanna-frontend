'use client';

import PasswordInput from "@/app/components/Forms/password_input";
import TextInput from "@/app/components/Forms/text_input";
import { ACCOUNT_AUTHORIZED, ACCOUNT_EMAIL_LABAL, ACCOUNT_EMAIL_PLACEHOLDER, ACCOUNT_IS_ALLOWED_LABAL, ACCOUNT_IS_AN_ADMIN_LABAL, ACCOUNT_IS_MASTER_LABAL, ACCOUNT_IS_NOT_AN_ADMIN_LABAL, ACCOUNT_NAME_LABAL, ACCOUNT_NAME_PLACEHOLDER, ACCOUNT_NOT_AUTHORIZED, ACCOUNT_PASSWORD_LABAL, ACCOUNT_PASSWORD_PLACEHOLDER, ACCOUNT_PASSWORD_RETYPE_LABAL, ACCOUNT_PASSWORD_RETYPE_PLACEHOLDER, ACCOUNTS_API, ACCOUNTS_PAGE_NAME, ACCOUNTS_TABLE_FIELDS, ADD_BUTTON_LABAL, BACK, NEW_ACCOUNT, UPDATE, UPDATE_ACCOUNT_MODEL_TITLE } from "@/app/constants/constants";
import { AccountInterface } from "@/app/interfaces/account_interface";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";

export default function page(){

    const [accounts, setAccounts] = useState<AccountInterface[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<AccountInterface | null>(null);
    const [selectedAccountForUpdate, setSelectedAccountForUpdate] = useState<AccountInterface | null>(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const fetchAccounts = async () => {
        try {
          const response = await fetch(`${ACCOUNTS_API}fetch_all_accounts`);
          if (!response.ok) {
            throw new Error('Failed to fetch accounts');
          }
          const { success, data } = await response.json();
          if (success && Array.isArray(data)) {
            setAccounts(data);
          } else {
            throw new Error('Invalid API response format');
          }
        } catch (error) {
          console.error('Error fetching accounts:', error);
        }
        }

    const addAccount = async () => {
        try {
          const response = await fetch(`${ACCOUNTS_API}create_account`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedAccount),
          });
          if (!response.ok) {
            throw new Error('Failed to create account');
          }
          fetchAccounts();
        } catch (error) {
          console.error('Error creating account:', error);
        }
      };


      const callUpdateAPI = async () => {
        try {
            const response = await fetch(`${ACCOUNTS_API}update_account`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedAccountForUpdate), // Ensure selectedAccountForUpdate has correct structure
            });
            if (!response.ok) {
                throw new Error('Failed to update account');
            }
            fetchAccounts(); // Fetch updated account list after successful update
            setShowUpdateModal(false); // Close the update modal after successful update
        } catch (error) {
            console.error('Error updating account:', error);
        }
    };
    

        useEffect(() => {
            fetchAccounts();
        }, []);
    
    

    return (
        <>
        <div className="row">
            <div className="col-md-8">
            <h3 className="text-primary">{ACCOUNTS_PAGE_NAME}</h3>

                <Table bordered hover className="scrollable-table mt-4">
                    <thead>
                        <tr>
                            {ACCOUNTS_TABLE_FIELDS.map((field, index) => (
                                <th key={index} className='text-primary'>{field}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account, index) => (
                            <tr key={index}>
                                <td>{account._id}</td>
                                <td>{account.name}</td>
                                <td>{account.email}</td>
                                <td>
                                    
                                    {account.is_allowed ? (
                                        <span style={{ backgroundColor: "#d4edda", color: "#155724", padding: "2px 8px", borderRadius: "4px", fontWeight: 500 }}>
                                            {ACCOUNT_AUTHORIZED}
                                        </span>
                                    ) : (
                                        <span style={{ backgroundColor: "#f8d7da", color: "#721c24", padding: "2px 8px", borderRadius: "4px", fontWeight: 500 }}>
                                            {ACCOUNT_NOT_AUTHORIZED}
                                        </span>
                                    )}
                                </td>
                                <td>

                                
                                {account.is_master ? (
                                    <span style={{ backgroundColor: "#007bff", color: "#fff", padding: "2px 8px", borderRadius: "4px", fontWeight: 500 }}>
                                        {ACCOUNT_IS_AN_ADMIN_LABAL}
                                    </span>
                                ) : (
                                    <span style={{ backgroundColor: "#e2e3e5", color: "#6c757d", padding: "2px 8px", borderRadius: "4px", fontWeight: 500 }}>
                                        {ACCOUNT_IS_NOT_AN_ADMIN_LABAL}
                                    </span>
                                )}</td>
                                <td>
                                    <Button variant="primary" className="btn-sm" onClick={() => {setSelectedAccountForUpdate(account); setShowUpdateModal(true); console.log(selectedAccountForUpdate)}}>🔑</Button>
                                </td>
                            </tr>
                         ))}
                    </tbody>
                </Table> 
            </div>
            <div className="col-md-4">
                <h3 className="text-primary">{NEW_ACCOUNT}</h3>
                    <TextInput                                                               
                        form_id="user name"
                        onChangeText={(e) => setSelectedAccount({ ...selectedAccount, name: e.target.value })}
                        form_message=""
                        placeholder_text={ACCOUNT_NAME_PLACEHOLDER}
                        label={ACCOUNT_NAME_LABAL}
                        value={selectedAccount?.name}
                    />
                    <TextInput                                                               
                        form_id="email"
                        onChangeText={(e) => setSelectedAccount({ ...selectedAccount, email: e.target.value })}
                        form_message=""
                        placeholder_text={ACCOUNT_EMAIL_PLACEHOLDER}
                        label={ACCOUNT_EMAIL_LABAL}
                        value={selectedAccount?.email}
                    />
                    <PasswordInput
                        form_id="password"
                        onChangeText={(e) => setSelectedAccount({ ...selectedAccount, password: e.target.value })}
                        form_message=""
                        label={ACCOUNT_PASSWORD_LABAL}
                        value={selectedAccount?.password}
                        placeholder_text={ACCOUNT_PASSWORD_PLACEHOLDER}
                    />
                    <PasswordInput
                        form_id="password retype"
                        onChangeText={(e) => setSelectedAccount({ ...selectedAccount, retype_password: e.target.value })}
                        form_message=""
                        label={ACCOUNT_PASSWORD_RETYPE_LABAL}
                        value={selectedAccount?.password}
                        placeholder_text={ACCOUNT_PASSWORD_RETYPE_PLACEHOLDER}
                    />

                     <Button variant='success' className='mt-3' onClick={addAccount}>
                        {ADD_BUTTON_LABAL}
                    </Button>
            </div>
        </div>

        {showUpdateModal && selectedAccountForUpdate  && (
            <Modal show={showUpdateModal}>
            <Modal.Header closeButton onClick={() => setShowUpdateModal(false)}>
              <Modal.Title className='text-primary'>{UPDATE_ACCOUNT_MODEL_TITLE}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
    
            <TextInput                                                               
                form_id="user name"
                onChangeText={(e) => setSelectedAccountForUpdate({ ...selectedAccountForUpdate, name: e.target.value })}
                form_message=""
                placeholder_text={ACCOUNT_NAME_PLACEHOLDER}
                label={ACCOUNT_NAME_LABAL}
                value={selectedAccountForUpdate?.name}
            />
            <TextInput                                                               
                form_id="email"
                onChangeText={(e) => setSelectedAccountForUpdate({ ...selectedAccountForUpdate, email: e.target.value })}
                form_message=""
                placeholder_text={ACCOUNT_EMAIL_PLACEHOLDER}
                label={ACCOUNT_EMAIL_LABAL}
                    value={selectedAccountForUpdate?.email}
            />

            <label className="text-primary">{ACCOUNT_IS_ALLOWED_LABAL}</label>
            <select
                className='form-select'
                value={selectedAccountForUpdate?.is_allowed ? "true" : "false"}
                onChange={(e) =>
                    setSelectedAccountForUpdate({
                        ...selectedAccountForUpdate,
                        is_allowed: e.target.value === "true",
                    })
                }
            >
                <option value="true">{ACCOUNT_AUTHORIZED}</option>
                <option value="false">{ACCOUNT_NOT_AUTHORIZED}</option>
            </select>
    
            <label className="text-primary">{ACCOUNT_IS_MASTER_LABAL}</label>
            <select
                className='form-select'
                value={selectedAccountForUpdate?.is_master ? "true" : "false"}
                onChange={(e) =>
                    setSelectedAccountForUpdate({
                        ...selectedAccountForUpdate,
                        is_master: e.target.value === "true",
                    })
                }
            >
                <option value="true">{ACCOUNT_IS_AN_ADMIN_LABAL}</option>
                <option value="false">{ACCOUNT_IS_NOT_AN_ADMIN_LABAL}</option>
            </select>
    
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                {BACK}
              </Button>
              <Button variant="primary" onClick={() => {console.log(selectedAccountForUpdate?._id); callUpdateAPI(); setShowUpdateModal(false); }}>
                {UPDATE}
              </Button>
            </Modal.Footer>
          </Modal>
        )

        }
            
    </>
    )
}